import React from 'react';

import { Box, CircularProgress } from '@mui/material';

// CircularProgress material ui progress bar for describing the loading progress of a particular region of a page
const Spinner = () => {
	return (
		<Box display={'flex'} justifyContent={'center'} padding={'10px 20px'}>
			<CircularProgress/>
		</Box>
	);
};

export default Spinner;