import React from 'react'
import Dropzone from 'react-dropzone'
import styled from 'styled-components'

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  border: 2px dashed #318EFC;
  // border-radius: 3px;
  height: 100px;
  width: 500px;
  min-width: 300px;
  margin: 0 auto;
  @media (max-width: 700px) {
    width: auto;
  }
`

class DropzoneComponent extends React.Component {

    render() {
        return (
            <Dropzone
                maxSize={10 * 1000000} // 10MB
                onDrop={acceptedFiles => console.log(acceptedFiles)}
            >
                {({ getRootProps, getInputProps }) => (
                    <DivContainer {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Upload images here by drag and drop or click.</p>
                        <p>(Max size 10MB per image, 5 image Max)</p>
                    </DivContainer>
                )}
            </Dropzone>
        )
    }
}

export default DropzoneComponent
