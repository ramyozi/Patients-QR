<template>
  <div class="dashboard-container">
    <div class="header">
      <img src="../assets/person-icon.jpg" alt="Logo" class="logo" @click="toggleUserInfo">
      <div v-if="currentUser" class="user-info-modal" :class="{ 'active': showUserInfo }">
        <button @click="toggleUserInfo" class="close-button">×</button>
        <p><strong>Email:</strong> {{ currentUser.email }}</p>
        <p><strong>Role:</strong> {{ currentUser.role }}</p>
        <p><strong>First Name:</strong> {{ currentUser.firstName }}</p>
        <p><strong>Last Name:</strong> {{ currentUser.lastName }}</p>
        <button @click="logout">Logout</button>
      </div>
    </div>
    <div v-if="showUserInfo" class="backdrop" @click="toggleUserInfo"></div>

    <div class="dashboard-header">
      <h1>Welcome to Your Dashboard</h1>
      <button @click="logout" class="logout-button">Logout</button>
    </div>

    <div class="dashboard-content">
      <div class="dashboard-card" @click="goToAddPatient">
        <h3>Add Patient</h3>
        <p>Add new patient records to the system</p>
      </div>

      <div class="dashboard-card" @click="viewPatients">
        <h3>View Patients</h3>
        <p>Review and manage patient information</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'DashboardPage',
  data() {
    return {
      showUserInfo: false,
      currentUser: null,
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUser = user;
      } else {
        this.$router.push('/');
      }
    });
  },
  methods: {
    toggleUserInfo() {
      this.showUserInfo = !this.showUserInfo;
    },
    logout() {
      const auth = getAuth();
      auth.signOut().then(() => {
        this.$router.push('/');
      }).catch((error) => {
        console.error('Logout error', error);
      });
    },
    goToAddPatient() {
      // Logic to navigate to Add Patient Page
    },
    viewPatients() {
      // Logic to navigate to View Patients Page
    }
  }
}
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.logo {
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
  transition: box-shadow 0.3s;
}

.backdrop {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 9;
}

.user-info-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.user-info-modal.active {
  display: block;
  opacity: 1;
}


.dashboard-container {
  padding: 20px;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-header h1 {
  margin: 0;
}

.logout-button {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-button:hover {
  background-color: #c82333;
}

.dashboard-content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.dashboard-card {
  flex: 1;
  min-width: 200px;
  margin: 10px;
  padding: 20px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.3s;
}

.dashboard-card:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.dashboard-card h3 {
  margin-top: 0;
}

.dashboard-card p {
  margin-bottom: 0;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  outline: none;
}

.close-button:hover {
  color: #ff0000; 
}

</style>
