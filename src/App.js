import React from 'react';
import '../node_modules/react-vis/dist/style.css';
import './App.css';
import Chart from './chart.js';

// OECD (2020), Meat consumption (indicator). doi: 10.1787/fa290fd0-en (Accessed on 21 January 2020)
import meatJson from './meat_consumption.json';

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const [row, setRow] = React.useState();
  const classes = useStyles();

  const [location, setLocation] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [currentData, setCurrentData] = React.useState([]);

  // why doesn't React.useRef(null) work?
  const inputLabel = React.useRef('');
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleLocationChange = event => {
    setLocation(event.target.value);
  };
  const handleSubjectChange = event => {
    setSubject(event.target.value);
  };
  const handleGraphAdd = event => {
    setCurrentData([...currentData, meatJson.filter((r)=>{
      return r.LOCATION === location;
    }).filter((r)=>{
      return r.SUBJECT === subject;
    }).filter((r)=>{
      return r.MEASURE === 'KG_CAP';
    })]);
  };

  // Read JSON file and populate selection menus
  // TO DO
  // ---

  React.useEffect(() => {

  });

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Chart data={currentData}/>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="location">
            Location
          </InputLabel>
          <Select
            labelId="location"
            id="location"
            value={location}
            onChange={handleLocationChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'AUS'}>Australia</MenuItem>
            <MenuItem value={'CAN'}>Canada</MenuItem>
            <MenuItem value={'JPN'}>Japan</MenuItem>
            <MenuItem value={'KOR'}>Korea</MenuItem>
            <MenuItem value={'MEX'}>Mexico</MenuItem>
            <MenuItem value={'NZL'}>New Zealand</MenuItem>
            <MenuItem value={'TUR'}>Turkey</MenuItem>
            <MenuItem value={'USA'}>USA</MenuItem>
            <MenuItem value={'ARG'}>Argentina</MenuItem>
            <MenuItem value={'BRA'}>Brazil</MenuItem>
            <MenuItem value={'CHL'}>Chile</MenuItem>
            <MenuItem value={'CHN'}>China</MenuItem>
            <MenuItem value={'COL'}>Colombia</MenuItem>
            <MenuItem value={'EGY'}>Egypt</MenuItem>
            <MenuItem value={'ETH'}>Ethiopia</MenuItem>
            <MenuItem value={'IND'}>India</MenuItem>
            <MenuItem value={'IDN'}>Indonesia</MenuItem>
            <MenuItem value={'IRN'}>Iran</MenuItem>
            <MenuItem value={'ISR'}>Israel</MenuItem>
            <MenuItem value={'KAZ'}>Kazakhstan</MenuItem>
            <MenuItem value={'MYS'}>Malaysia</MenuItem>
            <MenuItem value={'NGA'}>Nigeria</MenuItem>
            <MenuItem value={'PAK'}>Pakistan</MenuItem>
            <MenuItem value={'PRY'}>Paraguay</MenuItem>
            <MenuItem value={'PER'}>Peru</MenuItem>
            <MenuItem value={'PHL'}>Phillipines</MenuItem>
            <MenuItem value={'RUS'}>Russia</MenuItem>
            <MenuItem value={'SAU'}>Saudi Arabia</MenuItem>
            <MenuItem value={'ZAF'}>South Africa</MenuItem>
            <MenuItem value={'THA'}>Thailand</MenuItem>
            <MenuItem value={'UKR'}>Ukraine</MenuItem>
            <MenuItem value={'VNM'}>Viet Nam</MenuItem>
            <MenuItem value={'WLD'}>WLD</MenuItem>
            <MenuItem value={'EU27'}>EU27</MenuItem>
            <MenuItem value={'OECD'}>OECD</MenuItem>
            <MenuItem value={'BRICS'}>BRICS</MenuItem>
            <MenuItem value={'NOR'}>Norway</MenuItem>
            <MenuItem value={'CHE'}>Switzerland</MenuItem>
            <MenuItem value={'GBR'}>United Kingdom</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="subject">
            Meat Type
          </InputLabel>
          <Select
            labelId="subject"
            id="subject"
            value={subject}
            onChange={handleSubjectChange}
            displayEmpty
            className={classes.selectEmpty}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'BEEF'}>Beef</MenuItem>
            <MenuItem value={'PIG'}>Pig</MenuItem>
            <MenuItem value={'POULTRY'}>Poultry</MenuItem>
            <MenuItem value={'SHEEP'}>Sheep</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" color="primary" onClick={handleGraphAdd}>
          Add to Chart
        </Button>
      </Container>
      <p>Data from OECD (2020), Meat consumption (indicator). doi: 10.1787/fa290fd0-en (Accessed on 21 January 2020)</p>
    </div>
  );
}

export default App;
