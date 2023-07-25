import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Hero from './Pages/Hero';
import About from './Pages/About';
import Feedback from './Pages/Feedback';
import PageNotFound from './Pages/PageNotFound';
import PlaceOrder from './Pages/PlaceOrder';
import TrackYourOrder from './Pages/TrackYourOrder';
import PrivateRoute from './Pages/PrivateRoute';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import AdminDashboard from './Admin/AdminDashboard'
import Quotations from './Pages/Quotations';
import Orders from './Admin/Orders'
import AllFeedback from './Admin/AllFeedback'
import Users from './Admin/Users'
import AllQuotations from './Admin/AllQuotations';



function App() {
  const auth=()=>{
    //console.log(localStorage.getItem("authenticated"));
    if(localStorage.getItem("authenticated")!=null){
      return true;
    }
    return false;
  }
  //console.log(auth());
  var authen=auth();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Hero/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/more' element={<Feedback/>}/>
          <Route exact path='/SignIn' element={<SignIn/>}/>
          <Route exact path='/SignUp' element={<SignUp/>}/>

          {/*Private routes*/}
          <Route element={<PrivateRoute auth={authen}/>}>
            <Route exact path='/placeorder' element={<PlaceOrder/>}/>
            <Route exact path='/trackyourorder' element={<TrackYourOrder/>}/>
            <Route exact path='/quotations' element={<Quotations/>}/>

            {/*admin routes*/}
            <Route exact path='/adminDashboard' element={<AdminDashboard/>}/>
            <Route exact path='/users' element={<Users/>}/>
            <Route exact path='/viewQuotations' element={<AllQuotations/>}/>
            <Route exact path='/viewOrders' element={<Orders/>}/>
            <Route exact path='/feedback' element={<AllFeedback/>}/>


          </Route>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
