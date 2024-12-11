type Profile = {
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    birthDate: string; 
    gender: "FEMALE" | "MALE"  
    location: {
      city: string;
      country: string;
    };
  };

  export default Profile;