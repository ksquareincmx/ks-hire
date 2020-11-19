import React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@material-ui/core/CircularProgress';

interface IKSpinnerProps extends CircularProgressProps {}

const KSpinner: React.FC<IKSpinnerProps> = (props) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function tick() {
      setProgress((oldProgress) =>
        oldProgress >= 100 ? 0 : oldProgress + 1,
      );
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgress
      size={40}
      thickness={8}
      value={progress}
      {...props}
    />
  );
};

export default KSpinner;
