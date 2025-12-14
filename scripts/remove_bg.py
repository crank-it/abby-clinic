#!/usr/bin/env python3
"""
Background removal script using OpenCV and PIL.
Usage: python scripts/remove_bg.py <input_image> [output_path]
"""

import sys
import os
import cv2
import numpy as np
from PIL import Image

def remove_background(input_path, output_path=None):
    """Remove background from an image using GrabCut algorithm."""

    if not os.path.exists(input_path):
        print(f"Error: Input file '{input_path}' not found")
        sys.exit(1)

    # Generate output path if not provided
    if output_path is None:
        base, ext = os.path.splitext(input_path)
        output_path = f"{base}_nobg.png"

    # Read image
    img = cv2.imread(input_path)
    if img is None:
        print(f"Error: Could not read image '{input_path}'")
        sys.exit(1)

    # Create mask
    mask = np.zeros(img.shape[:2], np.uint8)

    # Define rectangle for GrabCut (slight margin from edges)
    h, w = img.shape[:2]
    margin = 10
    rect = (margin, margin, w - 2*margin, h - 2*margin)

    # Background and foreground models
    bgd_model = np.zeros((1, 65), np.float64)
    fgd_model = np.zeros((1, 65), np.float64)

    # Apply GrabCut
    print("Processing image with GrabCut algorithm...")
    cv2.grabCut(img, mask, rect, bgd_model, fgd_model, 5, cv2.GC_INIT_WITH_RECT)

    # Create binary mask
    mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')

    # Apply mask to image
    img_rgba = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    img_rgba[:, :, 3] = mask2 * 255

    # Convert to PIL and save as PNG with transparency
    img_pil = Image.fromarray(cv2.cvtColor(img_rgba, cv2.COLOR_BGRA2RGBA))
    img_pil.save(output_path, 'PNG')

    print(f"Saved: {output_path}")
    return output_path


def remove_white_background(input_path, output_path=None, threshold=240):
    """Remove white/light background from an image."""

    if not os.path.exists(input_path):
        print(f"Error: Input file '{input_path}' not found")
        sys.exit(1)

    # Generate output path if not provided
    if output_path is None:
        base, ext = os.path.splitext(input_path)
        output_path = f"{base}_nobg.png"

    # Open image with PIL
    img = Image.open(input_path).convert('RGBA')
    data = np.array(img)

    # Find white-ish pixels (R, G, B all above threshold)
    r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
    white_mask = (r > threshold) & (g > threshold) & (b > threshold)

    # Set alpha to 0 for white pixels
    data[:,:,3] = np.where(white_mask, 0, 255)

    # Save result
    result = Image.fromarray(data)
    result.save(output_path, 'PNG')

    print(f"Saved: {output_path}")
    return output_path


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python scripts/remove_bg.py <input_image> [output_path]")
        print("       python scripts/remove_bg.py --white <input_image> [output_path]  # For white backgrounds")
        sys.exit(1)

    # Check for white background mode
    if sys.argv[1] == '--white':
        if len(sys.argv) < 3:
            print("Error: Please provide input image path")
            sys.exit(1)
        input_path = sys.argv[2]
        output_path = sys.argv[3] if len(sys.argv) > 3 else None
        remove_white_background(input_path, output_path)
    else:
        input_path = sys.argv[1]
        output_path = sys.argv[2] if len(sys.argv) > 2 else None
        remove_background(input_path, output_path)
