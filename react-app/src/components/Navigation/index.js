import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { useHistory } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const history = useHistory()
	const handleClick = () => {
		history.push('/')
	}

	return (
		<div className='nav-container'>
			<div className='nav-left'>
				<div id='home-button' onClick={handleClick}>pEtsy</div>
				{/* <div className='image-container'>
					<img className='prints' src='https://thumbs.gfycat.com/ThoroughUnnaturalAlbacoretuna-size_restricted.gif' />
				</div> */}
			</div>

			{isLoaded && (
				<div className='nav-right'>
					<ProfileButton user={sessionUser} />
					<i class="head fa-solid fa-cart-shopping fa-3x"></i>
				</div>
			)}
		</div>
	);
}

export default Navigation;
