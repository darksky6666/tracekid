// 以下三行千万别碰, 目前没登入功能, 只能暂定特定的id， 碰了就会爆炸
export const userId = 1;
export const chatId = 1;
export const agentId = 2;

// 以下可被安全更改，字面意思 别碰 = 前面的就好:
// shop那页的商品资料可到 Item.json 更改, 颜色可到 Colors.js 更改
export const agentProfilePic = 'https://picsum.photos/200';
export const deviceName = 'Jordon';
export const phoneNumber = 'tel:+60123456789';
export const versionInfo = 'v1.0.004 (BETA)';

// Edit Profile Page
// 只有enabled: true 点了才会跳转下一页更改
export const profileItems = [
  { title: 'Profile Picture', field: 'profilepic' },
  { title: 'Name', field: 'name', enabled: true },
  { title: 'E-mail', field: 'email' },
  { title: 'Phone No.', field: 'phoneno' },
  { title: 'Gender', field: 'gender' },
  { title: 'Date Of Birth', field: 'dob' },
  { title: 'Change Password', field: 'password' },
  { title: 'Roles', field: 'roles' },
  { title: 'Delete Account', field: 'deleteacc' },
];
// 确保跟上面的field一样，你上面放phoneno下面就放一样的（放错最多没效果而已），后面就是header的名字
export const fieldLabelMap = {
  name: 'Name',
  phoneno: 'Phone Number',
};
