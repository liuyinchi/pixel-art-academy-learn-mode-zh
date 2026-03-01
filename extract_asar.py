#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extract .asar archive files (Electron format)"""
import struct, json, os, sys

def extract_asar(asar_path, dest_dir):
    with open(asar_path, 'rb') as f:
        # ASAR format uses Chromium Pickle for the header:
        #
        # [0..3]   uint32 LE: size pickle's payload_size (structural, not used directly)
        # [4..7]   uint32 LE: header_buf_size (the actual useful value)
        # [8..8+header_buf_size-1]: header pickle buffer containing:
        #   [8..11]  uint32 LE: header pickle's payload_size
        #   [12..15] uint32 LE: JSON string length
        #   [16..16+strlen-1]: JSON header string
        # [8+header_buf_size..]: file data
        #
        # File offsets in the header are relative to the start of file data.

        _pickle_payload_size = struct.unpack('<I', f.read(4))[0]  # bytes 0-3
        header_buf_size = struct.unpack('<I', f.read(4))[0]       # bytes 4-7

        # Read the header buffer
        header_buf = f.read(header_buf_size)

        # Parse the header pickle: skip first 4 bytes (payload_size),
        # read uint32 string length, then read the string
        _header_pickle_payload = struct.unpack('<I', header_buf[0:4])[0]
        json_str_len = struct.unpack('<I', header_buf[4:8])[0]
        header_json = header_buf[8:8+json_str_len].decode('utf-8')
        header = json.loads(header_json)

        # File data starts right after the size pickle (8 bytes) + header buffer
        data_offset = 8 + header_buf_size

        file_count = [0]
        error_count = [0]

        def extract_node(node, current_path):
            os.makedirs(current_path, exist_ok=True)
            if 'files' in node:
                for name, child in node['files'].items():
                    child_path = os.path.join(current_path, name)
                    if 'files' in child:
                        extract_node(child, child_path)
                    elif 'offset' in child:
                        try:
                            offset = int(child['offset'])
                            size = int(child['size'])
                            f.seek(data_offset + offset)
                            data = f.read(size)
                            os.makedirs(os.path.dirname(child_path), exist_ok=True)
                            with open(child_path, 'wb') as out:
                                out.write(data)
                            file_count[0] += 1
                        except Exception as e:
                            error_count[0] += 1
                    # Skip symlinks and unpacked files silently

        extract_node(header, dest_dir)
        return file_count[0], error_count[0]

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print("Usage: python extract_asar.py <input.asar> <output_dir>")
        sys.exit(1)

    asar_path = sys.argv[1]
    dest_dir = sys.argv[2]

    print(f"Extracting: {asar_path}")
    print(f"To: {dest_dir}")

    files, errors = extract_asar(asar_path, dest_dir)
    print(f"Done! {files} files extracted, {errors} errors")
