import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    position: 'absolute',
    width:"143px",
    height:'134px',
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
    bottom: '642px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height:'134px',
    width:'700px',
    margin: '10px 10px 10px 10px'
    // filter: drop-shadow("0px 4px 4px", rgba(0, 0, 0, 0.25))
  },
  overlay: {
    position: 'absolute',
    left: '144px',
  },
  overlay2: {
    position: 'absolute',
    right: '20px',
    color: 'black',
    
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
    padding: '10px 16px 8px 460px',
    display: 'block',
    float:'left'
  },
  cardAction: {
    top:'300px',
    bottom:'10px',
    display: 'block',
    textAlign: 'initial',
  },
});