import React from 'react'

export const Checkbox = () => {
	const [checked, setChecked] = React.useState(true);

	return (
		<label>
				<input
				type="checkbox"
				checked={checked}
				onChange={() => setChecked(!checked)}
				/>
				Check Me!
		</label>
	);
}
