Fix the Certificates section UI.

The certificate image is currently being displayed too small and partially cropped. I want the FULL certificate to be clearly visible.

Requirements:

1. Certificate Preview
- Make the certificate image larger inside the certificate card.
- Show the COMPLETE certificate image, including all edges, text, logos, signatures, and bottom section.
- Do NOT crop any part of the certificate.
- Do NOT stretch or distort the certificate.
- Preserve the original aspect ratio.
- Use `object-fit: contain` for the certificate image.
- Adjust the certificate image/container dimensions so the certificate is easy to read while keeping the existing overall design attractive.
- The certificate should not be squeezed into a narrow vertical area like it is currently.

2. Full-Screen Certificate Viewer
- Make the certificate image clickable.
- When the user clicks the certificate, open a large modal/lightbox.
- In the modal, display the FULL certificate at the largest possible size while preserving its aspect ratio.
- Use `object-fit: contain`.
- Do NOT crop, stretch, or distort the image.
- The modal should have a dark/clean background so the certificate is easy to view.
- Add a clearly visible Close (X) button.
- Allow the user to close the modal by clicking the X button.
- Also allow closing the modal by clicking outside the certificate.
- If appropriate, allow Escape key to close the modal.

3. Existing Design
- Keep the current portfolio's existing visual style, animations, fonts, colors, spacing, and responsive design.
- Do NOT redesign the entire Certificates section.
- Only modify the certificate card/image display and add the full-screen viewer.
- Make sure the layout still looks good on desktop, tablet, and mobile.

4. Image Quality
- Do not modify or compress the certificate image unnecessarily.
- Use the existing `image` URL from the certificate data.
- Make sure the complete certificate remains readable.

5. Important
- Inspect the existing Certificates component and its CSS/Tailwind classes before making changes.
- Implement the fix in the existing component structure instead of creating unnecessary new components/files.
- Make sure there are no TypeScript or build errors after the change.

The desired behavior is:
Normal view → large complete certificate preview inside the card.
Click certificate → large modal opens → FULL certificate visible without cropping.
Close modal → return to the normal certificate card.