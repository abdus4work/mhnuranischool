import configs from './configs/serverConfig.js';
import authRepository from './repositories/authRepository.js';
import staffRepository from './repositories/staffRepository.js';
import { checkAdminExistsService } from './services/authService.js';
import { getFormattedSequence } from './services/counterService.js';

export const initializeAdmin = async () => {
  const hasAdmin = await checkAdminExistsService();
  if (hasAdmin) {
    console.log('Admin already exists');
    return;
  }

  const employeeId= await getFormattedSequence('staffId','EMP');

  const adminData = {
    employeeId,
    fullName:configs.ADMIN_FULL_NAME,
    contactNumber:configs.ADMIN_CONTACT,
    email:configs.ADMIN_EMAIL,
    address:configs.ADMIN_ADDRESS,
    dateOfJoining:configs.ADMIN_DATE_OF_JOINING
  }

  const newStaff = await staffRepository.create(adminData);

  const authData = {
    username:configs.ADMIN_USERNAME,
    password:configs.ADMIN_PASSWORD,
    linkedId:newStaff._id,
    role:'admin'
  }

  await authRepository.create(authData);

  console.log('Default admin created successfully!')
  
};


