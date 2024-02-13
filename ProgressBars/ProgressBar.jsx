import React from 'react'

export const ProgressBar = () => {
    const ctx = useContext(ReactComponentContext);

	const [style, setStyle] = React.useState({});
	var progress = ctx?.markdownPostProcessorContext?.frontmatter?.Progress;
			
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${progress}%`
		}
		
		setStyle(newStyle);
	}, 200);
    if (!progress) { progress = 0}

	return (
		<div className="progressbar">
			<div className="progressbar-done" style={style}>
			{progress}%
			</div>
		</div>
	)
}
