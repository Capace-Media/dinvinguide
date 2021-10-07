import { renderSection } from '../../../utils/acf';

const Blocks = ({ blocks }) => {
  return <>{blocks.map((block) => renderSection(block))}</>;
};

export default Blocks;
