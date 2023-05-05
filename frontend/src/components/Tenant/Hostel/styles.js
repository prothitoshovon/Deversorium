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
    bottom: '642px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height:'114px',
    width:'600px',
    margin: '10px 10px 10px 10px'
  },
  overlay: {
    position: 'absolute',
    left: '144px',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
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
    borderRadius:'55px',
    backgroundColor:'#0C21C1',
    fontSize:'14px',
    width:'167px',
    height:'61px',
    color:'white',
    alignContent:'center',
  },
  cardAction: {
    top:'10px',
    left: '43px',
    color:'white',
    backgroundColor:'#0C21C1',
    display: 'block',
    textAlign: 'initial',
  },
  rating:{
    top:'49px',
    left:'43px',
    marginBottom:'20px',
    color:'#0C21C1'
  },
  textField:{
    left:'43px',
    width:'300px',
    backgroundColor:'#F9F9F9',
    color:'#F9F9F9'
  },
  crow:{
    padding:'40px 10px 10px 43px',
    left:'43px'
  },
  complaint:{
    top:'10px',
    backgroundRadius:'15px',
    width:'300px',
    backgroundColor:'#F9F9F9',
    color:'#F9F9F9'
  },
  crow2:{
    padding:'90px 0px 0px 0px',
    left:'43px'
  },
  cardAction2:{
    top:'20px',
    color:'white',
    backgroundColor:'#0C21C1',
    display: 'block',
    textAlign: 'initial',
  }
});