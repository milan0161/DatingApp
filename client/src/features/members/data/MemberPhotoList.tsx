import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

type MemberImageListProps = {
  images: { url: string; id: number }[];
};
const MemberImageList = ({ images }: MemberImageListProps) => {
  return (
    <div className="border border-slate-300 rounded w-fit p-4">
      <ImageList
        variant="standard"
        sx={{ width: 500, height: 450 }}
        cols={3}
        rowHeight={164}
      >
        {images.map((img) => (
          <ImageListItem key={img.id}>
            <img className="" src={img.url} loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
};

export default MemberImageList;
