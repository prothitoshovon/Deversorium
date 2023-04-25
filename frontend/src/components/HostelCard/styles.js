import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    position: 'absolute',
    width:"351px",
    height:'274px',
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
    top: '50px',
    bottom: '642px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height:'330px',
    width:'1002px',
    margin: '10px 10px 10px 10px',
    backgroundColor:'#F8F8F8'
  },
  overlay: {
    position: 'absolute',
    left: '414px',
    display:'flex'
  },
  overlay2: {
    position: 'absolute',
    top: '84px',
    left: '414px',
    display:'block',
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
    top:'52px',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius:'25px',
    backgroundColor:'#0C21C1',
    fontSize:'14px',
    width:'167px',
    height:'61px',
    color:'white',
    alignContent:'center',

  },
  cardAction: {
    top:'300px',
    bottom:'10px',
    display: 'block',
    textAlign: 'initial',
  },
});