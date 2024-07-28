interface JoinUsFormEmailProps {
	name: string;
	email: string;
	phone: string;
	location: string;
	resumeAndPortfolio: string;
}

const JoinUsFormEmail: React.FC<Readonly<JoinUsFormEmailProps>> = ({
	name,
	email,
	phone,
	location,
	resumeAndPortfolio,
}) => (
	<div>
		<h3>Someone has applied!</h3>
		<p>
			From <strong>{name}</strong> at {email}
		</p>
		<h3>Phone Number:</h3>
		<p>{phone}</p>
		<h3>Location:</h3>
		<p>{location}</p>
		<h3>Resume & Portfolio attached</h3>
		{/* <p>{resumeAndPortfolio}</p> */}
	</div>
);

export default JoinUsFormEmail;
