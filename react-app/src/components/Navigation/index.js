import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useHistory } from 'react-router-dom';
import { thunkMyCart } from '../../store/cart';
import './Navigation.css';

function Navigation({ isLoaded, num }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const dispatch = useDispatch()
	const cartItems = useSelector(state => state.cart?.items)
	console.log("cartItems", cartItems)


	useEffect(() => {
        dispatch(thunkMyCart());
    }, [dispatch]);


	const handleClick = () => {
		history.push('/')
	}

	const cartClick = () => {
		if(sessionUser){
			history.push('/my-cart')
		}
		else window.alert("Must be signed in to view your cart.")
	}

	return (
		<div className='nav-container'>
			<div className='nav-left'>
				<div id='home-button' onClick={handleClick}>pEtsy</div>
			</div>

			{isLoaded && (
				<div className='nav-right'>
					<ProfileButton user={sessionUser} />
					<i onClick={cartClick} class="head fa-solid fa-cart-shopping fa-3x button badge" value={Object.values(cartItems)?.length}></i>
				</div>
			)}
		</div>
	);
}

export default Navigation;
