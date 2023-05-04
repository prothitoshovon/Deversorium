import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    position: 'absolute',
    width:"143px",
    height:'114px',
    borderRadius:'15px'
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    position: 'relative',
    left: '10px',
    right: '594px',
    top: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height:'124px',
    width:'600px',
    margin: '0px 10px 0px 10px'
  },
  overlay: {
    position: 'absolute',
    left: '144px',
  },
  overlay2: {
    position: 'absolute',
    top: '10px',
    right: '20px',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '80px 16px 8px 480px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    top:'300px',
    bottom:'10px',
    display: 'block',
    textAlign: 'initial',
  },
});