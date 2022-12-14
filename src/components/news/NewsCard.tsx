import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface INewsCard {
  title: string;
  author: string;
  urlToImg: string;
  description: string;
  url: string;
}

const NewsCard = (props: INewsCard) => {
  const theme = useTheme();

  return (
    <Card id="flexible">
      {/*id is a highest priority selector, which helps to override MuI default styles in StyledNewsWrapper */}
      <div>
        <CardMedia
          component="img"
          alt={`picture of ${props.title}`}
          height="140"
          image={props.urlToImg}
        />
        <CardHeader title={props.title} subheader={props.author} />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: props.description }}
            // property enables recognition of HTML tags within string-flow and adds proper styling to them
          >
            {/* {props.description} */}
          </Typography>
        </CardContent>
      </div>

      <div>
        <CardActions>
          <Button
            size="small"
            href={props.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ "&:visited": { color: `${theme.palette.success}` } }}
          >
            Learn More
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default NewsCard;
