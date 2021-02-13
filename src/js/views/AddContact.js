import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const AddContact = props => {
	const { actions, store } = useContext(Context);
	const [state, setState] = useState({
		showModal: false
	});

	const [data, setData] = useState({
		email: "",
		phone: "",
		name: "",
		address: ""
	});
	const inputChange = event => {
		setData({ ...data, [event.target.name]: event.target.value });
	};
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Add a new contact</h1>
				<form>
					<div className="form-group">
						<label>Full Name</label>
						<input
							className="form-control "
							name="name"
							onChange={inputChange}
							type="text"
							placeholder="Full Name"
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							className="form-control "
							name="email"
							onChange={inputChange}
							type="text"
							placeholder="Email"
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							className="form-control "
							name="phone"
							onChange={inputChange}
							type="number"
							placeholder="Phone"
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							className="form-control "
							name="address"
							onChange={inputChange}
							type="text"
							placeholder="Address"
						/>
					</div>
					<Link to="/">
						<button
							onClick={() => {
								if (store.currentUser) {
									actions.editContact(data, store.currentUser);
									actions.getContacts();
									actions.cleanUser();
								} else {
									actions.addNewContact(data);
								}
							}}
							className="btn btn-block btn-success">
							Add Contact
						</button>
					</Link>
					<Link className="mt-3 w-100 text-center" to="/">
						0r get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

AddContact.propTypes = {
	id: PropTypes.string
};
