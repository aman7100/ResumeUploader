
import {Grid,TextField,Typography,FormControlLabel,
  Checkbox,Button,Box,Alert,InputLabel,MenuItem,Select,
  FormControl,FormLabel,RadioGroup,Radio,
  FormGroup,Stack,Table,TableBody,TableCell,TableContainer,TableHead,
  TableRow,Paper,Avatar} from '@mui/material';
import { LocalizationProvider,DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useSaveProfileMutation ,useGetResumeProfileQuery} from './services/candidateProfileApi'; 
import { format } from 'date-fns';

function App() {

  const Input= styled('input')({
    display:'none',
  });

  const [name,setName]=useState()
  const [gender,setGender]=useState()
  const [pimage,setPimage]=useState()
  const [rdoc,setRdoc]=useState()
  const [email,setEmail]=useState()
  const [pjl,setPjl]=useState([])
  const [dob,setDob]=useState(null)
  const [st,setSt]=useState('')
  const [error,setError] = useState({
    status: false,
    msg : "",
    type : ""
  })
const [candidates,setCandidates] = useState([])
const getPjl=(e)=>{
  let data=pjl;
  data.push(e.target.value)
  setPjl(data)

}
const resetform=()=>{
  setName('')
  setEmail('')
  setDob('')
  setSt('')
  setGender('')
  setPjl('')
  setPimage('')
  setRdoc('')
  document.getElementById('resume-form').reset()
}
const [saveProfile]=useSaveProfileMutation()
const {data, isSuccess }=useGetResumeProfileQuery()
console.log(data)
useEffect(()=>{
  if(data && isSuccess){
    setCandidates(data.candidates)
  }
},[data,isSuccess])

const handleSubmit=async(e)=>{
  e.preventDefault();
  const data=new FormData()
  data.append('name',name)
  data.append('email',email)
  data.append('dob',dob)
  data.append('st',st)
  data.append('pjl',pjl)
  data.append('gender',gender)
  data.append('pimage',pimage)
  data.append('rdoc',rdoc)
  
  if(name && email)
  {
    const res=await saveProfile(data)
    console.log(res)
   
    setError({status:true,msg:"Resume Uploaded Successfully",type:'success'})
    resetform()
    
  }
   else
   {
     setError({status:true,msg:"All Fields are Required",type:'error'})
   }
}

  return (
    <>
    <Box display="flex" justifyContent="center" sx={{
      backgroundColor:'error.light' ,padding: 2}}>
     <Typography variant='h2' component="div" sx={{
      fontWeight:'bold',color:'white'
     }}>Resume Uploader</Typography>
    </Box>
    <Grid container justifyContent="center">
      <Grid item xs={5}>
        <Box component="form" noValidate id="resume-form"onSubmit={handleSubmit} >
          <TextField id="name" name="name" required fullWidth
          margin='normal' label='Name' onChange={(e)=>{setName(e.target.value)}} />
          <TextField id="email" email="email" required fullWidth
          margin='normal' label='Email' onChange={(e)=>{setEmail(e.target.value)}}/>
          <Box mt={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker Label="Date Of Birth" value={dob} onChange={(newValue)=>{setDob(newValue)}}
            renderInput={(params)=><TextField{...params}/>}/>
            </LocalizationProvider>
          </Box> 
          <FormControl fullWidth margin='normal'>
            <InputLabel id="state-select-label">State</InputLabel>
            <Select labelId='state-select-label' id='state-select' value={st}
            Label='st' onChange={(e)=>{setSt(e.target.value)}}>
              <MenuItem value="Jharkhand">Jharkhand</MenuItem>
              <MenuItem value="Bihar">Bihar</MenuItem>
              <MenuItem value="West Bengal">West Bengal</MenuItem>
              
            </Select>
          </FormControl>
          <FormControl fullWidth margin='normal'>
            <FormLabel id="gender-radio">Gender</FormLabel>
            <RadioGroup row name="gender" aria-aria-labelledby="gender-radio">
              <FormControlLabel value="Male" control={<Radio/>} label='Male' onChange={(e)=>setGender(e.target.value)}/>
              <FormControlLabel value="Female" control={<Radio/>} label='Female' onChange={(e)=>setGender(e.target.value)}/>
              <FormControlLabel value="Other" control={<Radio/>} label='Other' onChange={(e)=>setGender(e.target.value)}/>
            </RadioGroup>
          </FormControl>
          <FormControl component='fieldset' fullWidth margin='normal'>
            <FormLabel component='legend'>Preffered Job Location:</FormLabel>
            <FormGroup row>
              <FormControlLabel value="Delhi" control={<Checkbox/>} label='Delhi' onChange={(e)=>getPjl(e)}/>
              <FormControlLabel value="Mumbai" control={<Checkbox/>} label='Mumbai' onChange={(e)=>getPjl(e)}/>
              <FormControlLabel value="Bangalore" control={<Checkbox/>} label='Bangalore' onChange={(e)=>getPjl(e)}/>
            </FormGroup>
          </FormControl>
          <Stack direction="row" alignItems='center' spacing ={4}>
            <label htmlFor='profile-photo'>
              <Input  accept="image/*" id="profile-photo" type="file" onChange={(e)=>{setPimage(e.target.files[0])}}/>
              <Button variant='contained' component='span'>Upload Photo</Button>
            </label>
            <label htmlFor='resume-file'>
              <Input accept="doc/*" id="resume-file" type="file" onChange={(e)=>{setRdoc(e.target.files[0])}}/>
              <Button variant='contained' component='span'>Upload File</Button>
            </label>
          </Stack>
          <Button type='submit' variant='contained' sx={{mt:3,mb:2,px:5}}
          color="error">Submit</Button>
          {error.status?<Alert severity={error.type}>{error.msg}</Alert>:''}
          </Box>
      </Grid>
      <Grid item xs={7}>
      <Box display="flex" justifyContent="center" sx={{
      backgroundColor:'info.light' ,padding: 1}}>
     <Typography variant='h5' component="div" sx={{
      fontWeight:'bold',color:'white'
     }}>List Of Candidates</Typography>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{minwidth:650}} aria-Label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">DOB</TableCell>
            <TableCell align="center">State</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Avatar</TableCell>
           </TableRow>
        </TableHead>
        <TableBody>
          {candidates.map((candidate,i)=>{
            return(

           
          <TableRow key={i}sx={{ '&:last-child td, &:last-childth':{border:0} }}>
            <TableCell align="center">{candidate.name}</TableCell>
            <TableCell align="center">{candidate.email}</TableCell>
            <TableCell align="center">{format(new Date(candidate.dob),'dd-MM-yyyy')}</TableCell>
            <TableCell align="center">{candidate.state}</TableCell>
            <TableCell align="center">{candidate.gender}</TableCell>
            <TableCell align="center">{candidate.location}</TableCell>
            <TableCell align="center"><Avatar src={`http://127.0.0.1:8000/${candidate.pimage}`}/></TableCell>

          </TableRow>
           );
          })
}
        </TableBody>
      </Table>
    </TableContainer>
      </Grid>
    </Grid>
     </>
  );
}

export default App;
