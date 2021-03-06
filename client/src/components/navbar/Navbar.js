import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GiSandsOfTime } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { Button } from "../buttons/Button";
import "./Navbar.css";
import { IconContext } from "react-icons/lib";
import { connect } from "react-redux";

class Navbar extends Component {
	state = { click: false, button: true };

	componentDidMount() {
		window.addEventListener("resize", this.showButton);
	}

	handleClick = () => {
		if (this.state.click === false) {
			this.setState({ click: true });
		} else {
			this.setState({ click: false });
		}
	};

	closeMobileMenu = () => {
		this.setState({ click: false });
	};

	showButton = () => {
		if (window.innerWidth <= 960) {
			this.setState({ button: false });
		} else {
			this.setState({ button: true });
		}
	};

	renderLoginLogout() {
		switch (this.props.auth) {
			case null:
				return;

			case false:
				return (
					<a
						href="/auth/google"
						className="nav-links"
						onClick={this.closeMobileMenu}
					>
						Login With Google
					</a>
				);
			default:
				return (
					<a
						href="/api/logout"
						className="nav-links"
						onClick={this.closeMobileMenu}
					>
						Logout
					</a>
				);
		}
	}

	renderUsername = () => {
		switch (this.props.auth) {
			case null:
				return;
			case false:
				return;
			default:
				return (
					<a className="nav-links" onClick={this.closeMobileMenu}>
						<div></div>Hi{" "}
						{this.props.auth.username !== undefined
							? this.props.auth.username
							: this.props.auth.user.username}
						!
					</a>
				);
		}
	};

	render() {
		return (
			<>
				<IconContext.Provider value={{ color: "#fff" }}>
					<div className="navbar">
						<div className="navbar-container container">
							<Link
								to="/"
								className="navbar-logo"
								onClick={this.closeMobileMenu}
								style={{ marginBottom: "2%" }}
							>
								<GiSandsOfTime className="navbar-icon" />
								TimeTracker
							</Link>
							<div className="menu-icon" onClick={this.handleClick}>
								{this.state.click ? <FaTimes /> : <FaBars />}
							</div>
							<ul
								className={
									this.state.click ? "nav-menu active" : "nav-menu"
								}
							>
								<li className="nav-item">
									<Link
										to={this.props.auth ? "/profile" : "/"}
										className="nav-links"
										onClick={this.closeMobileMenu}
									>
										{this.renderUsername()}
									</Link>
								</li>

								<li className="nav-item">
									<Link
										to="/"
										className="nav-links"
										onClick={this.closeMobileMenu}
									>
										Home
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to={this.props.auth ? "/activities" : "/"}
										className="nav-links"
										onClick={this.closeMobileMenu}
									>
										Activities
									</Link>
								</li>
								<li className="nav-item">
									<Link
										to={this.props.auth ? "/goals" : "/"}
										className="nav-links"
										onClick={this.closeMobileMenu}
									>
										Goals
									</Link>
								</li>
								<li className="nav-item">{this.renderLoginLogout()}</li>
							</ul>
						</div>
					</div>
				</IconContext.Provider>
			</>
		);
	}
}

function mapStateToProps({ auth }) {
	return { auth };
}

export default connect(mapStateToProps)(Navbar);
