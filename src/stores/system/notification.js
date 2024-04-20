import { ref, computed } from "vue";
import { defineStore } from "pinia";

// Error
import { ElMessage } from "element-plus";
import { ElNotification } from "element-plus";
import "element-plus/dist/index.css";

export const useSystemNotifications = defineStore("systemNotifications", () => {
  const showMessage = (type, message) => {
    ElMessage({
      showClose: true,
      message: message,
      type: type,
    });
  };
  const showNotification = (message, type, title, position) => {
    ElNotification({
      title: title || "Notification",
      message: message,
      type: type || "success",
      position: position || "bottom-right",
    });
  };

  return {
    showMessage,
    showNotification,
  };
});