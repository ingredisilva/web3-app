import Scrollbar from '@/components/custom-scroll/Scrollbar';
import { AppState, useDispatch, useSelector } from '@/store/Store';
import { setDarkMode } from '@/store/customizer/CustomizerSlice';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import WbSunnyTwoToneIcon from '@mui/icons-material/WbSunnyTwoTone';
import {
  Divider,
  Drawer,
  Fab,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import Box, { BoxProps } from '@mui/material/Box';
import { IconSettings, IconX } from '@tabler/icons-react';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

const SidebarWidth = '320px';

const Customizer: FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const customizer = useSelector((state: AppState) => state.customizer);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: '20px',
    cursor: 'pointer',
    justifyContent: 'center',
    display: 'flex',
    transition: '0.1s ease-in',
    border: '1px solid rgba(145, 158, 171, 0.12)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  }));

  return (
    <div>
      <Tooltip title="Settings">
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ position: 'fixed', right: '25px', bottom: '15px' }}
          onClick={() => setShowDrawer(true)}
        >
          <IconSettings stroke={1.5} />
        </Fab>
      </Tooltip>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        <Scrollbar sx={{ height: 'calc(100vh - 5px)' }}>
          <Box
            p={2}
            display="flex"
            justifyContent={'space-between'}
            alignItems="center"
          >
            <Typography variant="h4">{t('settings')}</Typography>
            <IconButton color="inherit" onClick={() => setShowDrawer(false)}>
              <IconX size="1rem" />
            </IconButton>
          </Box>
          <Divider />
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              {t('select-theme')}
            </Typography>
            <Stack direction={'row'} gap={2} my={2}>
              <StyledBox
                onClick={() => dispatch(setDarkMode('light'))}
                display="flex"
                gap={1}
              >
                <WbSunnyTwoToneIcon
                  color={
                    customizer.activeMode === 'light' ? 'primary' : 'inherit'
                  }
                />
                Light
              </StyledBox>
              <StyledBox
                onClick={() => dispatch(setDarkMode('dark'))}
                display="flex"
                gap={1}
              >
                <DarkModeTwoToneIcon
                  color={
                    customizer.activeMode === 'dark' ? 'primary' : 'inherit'
                  }
                />
                Dark
              </StyledBox>
            </Stack>
          </Box>
        </Scrollbar>
      </Drawer>
    </div>
  );
};

export default Customizer;
