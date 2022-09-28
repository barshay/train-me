import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
// import { Transformation } from "@cloudinary/url-gen";

// Import required actions.
// another option ro check: scale, fill
import { thumbnail, scale, fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
// import { sepia } from "@cloudinary/url-gen/actions/effect";
// import { source } from "@cloudinary/url-gen/actions/overlay";
// import { opacity, brightness } from "@cloudinary/url-gen/actions/adjust";
// import { byAngle } from "@cloudinary/url-gen/actions/rotate"

// Import required qualifiers.
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// import { image } from "@cloudinary/url-gen/qualifiers/source";
// import { Position } from "@cloudinary/url-gen/qualifiers/position";
// import { compass } from "@cloudinary/url-gen/qualifiers/gravity";


// Import plugins
import { lazyload, placeholder } from '@cloudinary/react';

const Img = ({ uploadedImg }) => {

  // Create and configure your Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'train-me'
    }
  });

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image(uploadedImg);
  // const myUrl = myImage.toURL();

  myImage
    .resize(thumbnail().width(150).height(150))  // Crop the image.
    .roundCorners(byRadius(30));    // Round the corners.
  //React SDK transformations are created using @cloudinary/url-gen.
  return (
    <>
      <AdvancedImage
        cldImg={myImage}
        // plugins={[lazyload(), placeholder({ mode: 'predominant-color' })]}
      />
    </>
  )
}

export default Img