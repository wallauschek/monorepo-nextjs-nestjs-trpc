import appStore from '@web/stores/app';

export interface IFooter extends React.HTMLAttributes<HTMLDivElement> {
  school?: string;
}

const Footer: React.FC<IFooter> = ({ ...props }) => {
  const { school } = appStore;
  const text = school === 'cel' ? 'CEL Intercultural School' : 'Colégio Franco-Brasileiro';

  return (
    <footer {...props} className="  bg-gray-50 p-3 text-center max-md:text-xs">
      <span>© 2023 {text}. Todos os direitos reservados.</span>
    </footer>
  );
};

export default Footer;
