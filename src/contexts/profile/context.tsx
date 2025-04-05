import useLocalStorage from '@/hooks/useLocalStorage';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LOCAL_STORAGE_KEY, STORED_PROFILE_KEY } from '@/constant';
import { ProfileData, AdditionalData, SpouseData, PersonalPreference, LocalStorageProfile } from '@/types';

// Define a type for the context value
interface ProfileContextType {
  profileData: ProfileData | null;
  additionalData: AdditionalData | null;
  spouseData: SpouseData | null;
  personalPreference: PersonalPreference | null;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData | null>>;
  setAdditionalData: React.Dispatch<React.SetStateAction<AdditionalData | null>>;
  setSpouseData: React.Dispatch<React.SetStateAction<SpouseData | null>>;
  setPersonalPreference: React.Dispatch<React.SetStateAction<PersonalPreference | null>>;
  updateProfileToLocalStorage: (key: keyof LocalStorageProfile, data: ProfileData | AdditionalData | SpouseData | PersonalPreference) => void;
}

// Create the context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

// Create a provider component
export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { getLocalStorage, setLocalStorage } = useLocalStorage();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [additionalData, setAdditionalData] = useState<AdditionalData | null>(null);
  const [spouseData, setSpouseData] = useState<SpouseData | null>(null);
  const [personalPreference, setPersonalPreference] = useState<PersonalPreference | null>(null);

  useEffect(() => {
    const storedProfile = getLocalStorage(LOCAL_STORAGE_KEY.CONVERTIM_PROFILE) as LocalStorageProfile;
    if (storedProfile?.profileData) setProfileData(storedProfile.profileData);
    if (storedProfile?.additionalData) setAdditionalData(storedProfile.additionalData);
    if (storedProfile?.spouseData) setSpouseData(storedProfile.spouseData);
    if (storedProfile?.personalPreference) setPersonalPreference(storedProfile.personalPreference);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const updateProfileToLocalStorage = (key: keyof LocalStorageProfile, data: ProfileData | AdditionalData | SpouseData | PersonalPreference) => {
  const storedProfile = getLocalStorage(LOCAL_STORAGE_KEY.CONVERTIM_PROFILE) as LocalStorageProfile || {};

  switch (key) {
    case STORED_PROFILE_KEY.PROFILE_DATA:
      setProfileData(data as ProfileData);
      storedProfile.profileData = data as ProfileData;
      break;
    case STORED_PROFILE_KEY.ADDITIONAL_DATA:
      setAdditionalData(data as AdditionalData);
      storedProfile.additionalData = data as AdditionalData;
      break;
    case STORED_PROFILE_KEY.SPOUSE_DATA:
      setSpouseData(data as SpouseData);
      storedProfile.spouseData = data as SpouseData;
      break;
    case STORED_PROFILE_KEY.PERSONAL_PREFERENCE:
      setPersonalPreference(data as PersonalPreference);
      storedProfile.personalPreference = data as PersonalPreference;
      break;
  }

  setLocalStorage(LOCAL_STORAGE_KEY.CONVERTIM_PROFILE, storedProfile);
}

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        additionalData,
        spouseData,
        personalPreference,
        setProfileData,
        setAdditionalData,
        setSpouseData,
        setPersonalPreference,
        updateProfileToLocalStorage }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Create a custom hook to use the ProfileContext
export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
