import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/loginAuth";
import { useLoginCheckStore } from '../stores/loginCheck.js';
import Swal from 'sweetalert2'

const loginCheck = useLoginCheckStore();
const loginAuth = useAuthStore()
const router = useRouter();
const timeOut = 1 * 60 * 1000  //設定超時時間: 30分鐘

/* 判斷是否有登入 */
if (loginCheck.getIsLogin){
  window.onload = function () {
    window.document.onmousedown = function () {
      loginCheck.setLastTime('lastTime', new Date().getTime())
    }
  };
}

const checkTimeout = () => {
  const currentTime = new Date().getTime()
  const lastTime = loginCheck.getLastTime()

  if ((currentTime - lastTime) > timeOut){
    // 清空 local storage
    localStorage.removeItem('userId')
    localStorage.removeItem('userAccount')

    // 變更 login auth 狀態
    loginAuth.setAuth(false)
    loginAuth.setUser('')
    loginAuth.setUserName('')
    loginAuth.setUserId('')
    loginAuth.setIsAdmin('')

    loginCheck.setIsLogin(false)
    loginCheck.setLoginTime('')
    loginCheck.setLastTime('')

    Swal.fire({
      title: '系統提示',
      text: '基於安全考量，超過30分鐘無任何操作，自動登出!',
      icon: 'warning',
      showConfirmButton: false,
      showCancelButton: false,
      timer: 1000,
    }).then(() => {
        router.push('/login');
    })
  }
}

export default function () {
    /* 定时器 间隔30秒检测是否长时间未操作页面 */
    // window.setInterval(checkTimeout, 30000);
    // window.setInterval(checkTimeout, 5000);
}