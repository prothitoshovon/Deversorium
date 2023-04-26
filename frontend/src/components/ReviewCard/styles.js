import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    position: 'absolute',
    width:"140px",
    height:'140px',
    borderRadius:'15px',
    left:'471px',
    top:'51px',
    right:'19px'
  },
  quote:{
    position: 'absolute',
    width: '46px',
    height: '25px',
    left: '25px',
    top:'10px',
    color: '#2A4EAA',
    fontFamily: 'DM serif Display',
    fontSize:'normal',
    fontWeight:'400',
    fontSize:'108px',
    display:'flex'


    
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
    top: '50px',
    bottom: '642px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height:'240px',
    width:'630px',
    margin: '10px 10px 10px 10px',
    backgroundColor:'#F8F8F8'
  },
  overlay: {
    position: 'absolute',
    display:'flex'
  },
  overlay2: {
    position: 'absolute',
    top: '84px',
    display:'block',
    width:'415px'
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