import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem'

type MemberImageListProps = {
   images : { url: string,
    id: number}[]
}
const MemberImageList = ({images}:MemberImageListProps) => {

    return(
        <ImageList variant='woven' >
           { images.map((img) => (
            <ImageListItem key={img.id}>
                <img
                 src={img.url}
                 
                 loading='lazy'/>
            </ImageListItem>
           ))}
            

        </ImageList>
    );
};

export default MemberImageList;