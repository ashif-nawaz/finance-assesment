import {
  makeStyles,
  TextField,
  Typography,
  Grid,
  Link,
} from "@material-ui/core";
import React, { useEffect, useState, Fragment } from "react";
import { fetchAlbums, fetchPhotos } from "../../store/expense";
import { useDispatch, useSelector } from "react-redux";
import Price from "./Price";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "550px",
    margin: " 5rem auto",
    background: "white",
    boxShadow: "0 0 5px lightgray",
    padding: "1rem",
    "& img": {
      width: "70px",
      borderRadius: "20px",
    },
  },

  albumTitle: {
    fontWeight: "600",
  },

  expenses: {
    marginTop: "2rem",
  },

  leftcol: {
    display: "flex",
    "& > div": {
      marginLeft: "1rem",
    },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },

  photo: {
    marginBottom: "1.3rem",
  },
}));

const Home = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const slice = useSelector((state) => state.expense);
  const allPhotos = slice.photos.slice(0, 100);
  const allAlbums = slice.albums;

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      const resp = await dispatch(fetchPhotos());
      setPhotos(resp.payload.data.slice(0, 100));
    })();
  }, [dispatch]);

  const handleChange = (e) => {
    const value = e.target.value;
    const searchedPhotos = allPhotos.filter((photo, i) => {
      return photo.title.includes(value.toLowerCase());
    });
    setPhotos(searchedPhotos);
  };

  console.log(allAlbums);
  return (
    <div className={classes.root}>
      <TextField variant="outlined" fullWidth onChange={handleChange} />

      <div className={classes.expenses}>
        <div className={classes.album}>
          {allAlbums.map((album) => {
            return (
              <Fragment key={album.id}>
                <Typography gutterBottom className={classes.albumTitle}>
                  {album.title}
                </Typography>
                {photos.map((item, i) => {
                  return (
                    <div className={classes.photo} key={item.id}>
                      <Grid container>
                        <Grid item xs={9} className={classes.leftcol}>
                          <div>
                            <img src={item.thumbnailUrl} alt="" />
                          </div>
                          <div className={classes.details}>
                            <Typography className={classes.albumTitle}>
                              {item.title}
                            </Typography>
                            <Link
                              style={{ color: "gray" }}
                              href={item.url}
                              target="_blank"
                            >
                              {item.url}
                            </Link>
                          </div>
                        </Grid>
                        <Grid item xs={1}>
                          <Price />
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
              </Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
