import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal.js";

export const Contact = () => {
	const [state, setState] = useState({
		showModal: false
	});

	const [selectedUser, setSelectedUser] = useState();
	const { store, actions } = useContext(Context);
	const [userID, setUserID] = useState();

	useEffect(() => {
		contactList();
	}, [store.contact]);

	let contactList = () => {
		return store.contact.map((item, index) => {
			return (
				<ContactCard
					key={index}
					email={item.email}
					phone={item.phone}
					address={item.address}
					fullname={item.full_name}
					onDelete={() => {
						setState({ showModal: true });
						setSelectedUser(item);
					}}
					onEdit={() => {
						store.currentUser = item.id;
					}}
				/>
			);
		});
	};

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add a new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{contactList()}
					</ul>
				</div>
			</div>
			<Modal show={state.showModal} id={selectedUser} onClose={() => setState({ showModal: false })} />
		</div>
	);
};
