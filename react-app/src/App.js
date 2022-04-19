import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar/'
// import ProtectedRoute from './components/auth/ProtectedRoute';
// import User from './components/User';
import Listings from './components/ListingsPage';
import SplashPage from './components/SplashPage';
import ListingDetails from './components/ListingDetails';
import MyListings from './components/MyListings';
import MyBookings from './components/MyBookings';
import NotFoundPage from './components/NotFoundPage';
import { authenticate } from './store/session';
import { getListings } from './store/listing';
import { getReviews } from './store/review';
import './index.css'
import { getUserBookings } from './store/booking';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {(async () => {
      await dispatch(authenticate());
      await dispatch(getListings());
      await dispatch(getReviews());
      await dispatch(getUserBookings(sessionUser?.id));
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) return null;


  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>
        <Route path='/listings' exact={true}>
          <Listings />
        </Route>
        <Route path='/listings/:id' exact={true}>
          <ListingDetails />
        </Route>
        <Route path='/mylistings/:id' exact={true}>
          <MyListings />
        </Route>
        <Route path='/mybookings/:id' exact={true}>
          <MyBookings />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
