import Carousel from 'better-react-carousel'

function ImageList(props){
    const {images, cols, state} = props;

    return(
        <div className="imageList" >
        <Carousel cols={ cols } gap={5} arrowLeft={ <div></div> } showDots hideArrow>
            { images.map( (f) => {
                return(
                    <Carousel.Item>
                        <div className='listImgWrapper' onClick={ () => { state(f) } }>
                            <img src={f} alt="" />
                        </div>
                    </Carousel.Item>
                )
            } ) }
        </Carousel>
    </div>
    )
}

export default ImageList;