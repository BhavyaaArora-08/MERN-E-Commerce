import React, { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    width: "400px",
    margin: "5px auto",
    fontSize: "1.2rem",
  },
};

const Alerte = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div style={{ padding: "0", margin: "0" }} className="alerts">
      {props.alerts &&
        props.alerts.map((alert) => (
          <Alert
            className={props.classes.root}
            severity={alert.alertType ? alert.alertType : "error"}
          >
            {alert.msg}
          </Alert>
        ))}
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    alerts: state.alerts,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(Alerte));
