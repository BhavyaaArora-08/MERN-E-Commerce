import React from "react";
import { MDBAnimation } from "mdbreact";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  })
);

const Container1 = () => {
  const classes = useStyles();
  return (
    <div
      style={{ backgroundColor: "white" }}
      className={`row container1 ${classes.root}`}
    >
      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
        <MDBAnimation type="fadeInLeft" delay="0s">
          <h1 className="text">60% Discount</h1>
        </MDBAnimation>
        <MDBAnimation type="fadeInLeft" delay="0.1s">
          <span className="text">
            Summer <br /> Collection
          </span>
        </MDBAnimation>
        <MDBAnimation type="fadeInLeft" delay="0.2s">
          <a href="#shop">
            <Button variant="contained" color="secondary">
              Shop Now
            </Button>
          </a>
        </MDBAnimation>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-6 col-6"></div>
    </div>
  );
};

export default Container1;
