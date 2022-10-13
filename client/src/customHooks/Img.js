import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
// import { Transformation } from "@cloudinary/url-gen";

// Import required actions.
// another option to check: scale, fill
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
// import { sepia } from "@cloudinary/url-gen/actions/effect";
// import { source } from "@cloudinary/url-gen/actions/overlay";
// import { opacity, brightness } from "@cloudinary/url-gen/actions/adjust";
import { byAngle } from "@cloudinary/url-gen/actions/rotate"

// Import required qualifiers.
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { face, FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// import { image } from "@cloudinary/url-gen/qualifiers/source";
// import { Position } from "@cloudinary/url-gen/qualifiers/position";
// import { compass } from "@cloudinary/url-gen/qualifiers/gravity";


// Import plugins
// import { lazyload, placeholder } from '@cloudinary/react';

const Img = ({ adminAvatar, customerAvatar, trainerAvatar }) => {

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'train-me'
    }
  });

  // Use the image with public ID, 'front_face'.
  const adminImage = cld.image(adminAvatar);
  adminImage
    .resize(thumbnail().width(150).height(150).gravity(focusOn(face())))  // Crop the image.
    .roundCorners(byRadius(30))   // Round the corners.
    .rotate(byAngle(12))
  //     .offsetX(expression("width / 50"))
  //     .offsetY(expression("width / 50"))
  // );

  const customerImage = cld.image(customerAvatar);
  customerImage
    .resize(thumbnail().width(150).height(150).gravity(focusOn(face())))  // Crop the image.
    .roundCorners(byRadius(30))   // Round the corners.
    .rotate(byAngle(12));

  const trainerImage = cld.image(trainerAvatar);
  trainerImage
    .resize(thumbnail().width(150).height(150).gravity(focusOn(face())))  // Crop the image.
    .roundCorners(byRadius(30))   // Round the corners.
    .rotate(byAngle(12));

  return (
    <>
      {adminAvatar &&
        <AdvancedImage
          style={{ width: "6em", height: "6em", borderRadius: "20%", marginLeft: "1em" }}
          cldImg={adminImage}
        // plugins={[lazyload(), placeholder({ mode: 'predominant-color' })]}
        />}
      {customerAvatar &&
        <AdvancedImage
        style={{ width: "6em", height: "6em", borderRadius: "20%", marginLeft: "1em" }}
          cldImg={customerImage}
        />}
      {trainerAvatar &&
        <AdvancedImage
        style={{ width: "6em", height: "6em", borderRadius: "20%", marginLeft: "1em" }}
          cldImg={trainerImage}
        />}
    </>
  )
}

export default Img;