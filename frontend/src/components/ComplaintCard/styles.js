import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    position: 'absolute',
    width:"140px",
    height:'140px',
    borderRadius:'15px',
    left:'421px',
    top:'5px',
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height:'130px',
    width:'550px',
    backgroundColor:'#F8F8F8'
  },
  overlay: {
    position: 'absolute',
    display:'flex'
  },
  overlay2: {
    position: 'absolute',
    top: '0px',
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
    top:'35px',
    fontSize:'14px',
    width:'60px',
    height:'30px',
    color:'white',
    alignContent:'center',
    marginTop:'90px'

  },
  cardAction: {
    top:'300px',
    bottom:'10px',
    display: 'block',
    textAlign: 'initial',
  },
});