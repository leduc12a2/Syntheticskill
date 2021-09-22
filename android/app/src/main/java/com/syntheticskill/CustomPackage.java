package com.syntheticskill;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CustomPackage implements ReactPackage { // mang tat ca cac custom module qua react native
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) { // list cac native module
        List<NativeModule> nativeModules = new ArrayList<>();
        nativeModules.add(new CustomModule(reactContext));
        return nativeModules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) { // tra ve mang cac view manager mang sang react native
        return Collections.emptyList();
    }
}
