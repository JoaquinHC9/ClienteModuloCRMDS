import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export const SidebarData = [
  {
    title: 'Main',
    icon: <HomeIcon />,
    link: '/Main',
  },
  {
    title: 'Registro',
    icon: <PersonAddIcon />,
    link: '/Registro',
  },
  {
    title: 'Busqueda Cliente',
    icon: <SearchIcon />,
    link: '/Busqueda',
  },
  {
    title: 'RQS',
    icon: <NotificationsActiveIcon />,
    link: '/moduloRQS',
  },
];
