// Import Components //
import JoinUsForm from "@/components/join-us-form";

export default function Joinus() {
	return (
		<section className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-start px-sectionpxsm lg:px-sectionpxlg pt-36 lg:pt-48 mb-28 lg:mb-52">
			<div className="w-full lg:w-full lg:flex lg:h-full">
				<div className="w-full lg:w-[45%] flex flex-col">
					<div className="flex-grow">
						<h2 className="text-3xl lg:text-[42px] text-black font-normal">
							Be Part of the Team.
						</h2>
					</div>

					<div className="hidden lg:flex flex-col justify-between mt-auto">
						<div className="flex flex-col gap-4">
							<p className="text-[15px] text-black font-semibold">
								We're Committed to Diversity and Inclusion
							</p>
							<p className="text-[15px] text-black">
								Every aspect of what we do is fueled by
								diversity.
								<br />
								We are dedicated to fostering an environment
								free
								<br />
								from discrimination.
							</p>
							<p className="text-[15px] text-black">
								Studionarta is committed to a policy of Equal
								<br />
								Employment Opportunity and does not
								<br />
								discriminate against applicants or employees
								based
								<br />
								on race, color, religion, creed, national origin
								or
								<br />
								ancestry, sex, age, or physical ability.
							</p>
						</div>
					</div>
				</div>

				<div className="w-full lg:w-[55%] mt-10 lg:mt-0 lg:h-full">
					<JoinUsForm />
				</div>
			</div>

			<div className="w-full lg:hidden flex flex-col items-start justify-center mt-20 gap-5">
				<p className="text-base text-black font-semibold">
					We're Committed to Diversity and Inclusion
				</p>
				<p className="text-base text-black">
					Every aspect of what we do is fueled by diversity.
					<br />
					We are dedicated to fostering an environment free
					<br />
					from discrimination.
				</p>
				<p className="text-base text-black">
					Studionarta is committed to a policy of Equal
					<br />
					Employment Opportunity and does not
					<br />
					discriminate against applicants or employees based
					<br />
					on race, color, religion, creed, national origin or
					<br />
					ancestry, sex, age, or physical ability.
				</p>
			</div>
		</section>
	);
}
