package com.syntheticskill;

import android.content.Intent;
import android.provider.Settings;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class CustomModule extends ReactContextBaseJavaModule {
    private static final String LENGTH_SHORT = "LENGTH_SHORT";
    private static final String LENGTH_LONG = "LENGTH_LONG";

    //Constuctor

    public  CustomModule(ReactApplicationContext context){
        super(context);
    }

    @NonNull
    @Override
    public String getName() { // return ve name su dung trong react native
        return "CustomModule";
    }
    //convert constant to react native


    @Nullable
    @Override
    public Map<String, Object> getConstants() {
//        return super.getConstants();
        final Map<String, Object> constants = new HashMap<>();
        constants.put("PI","3.1416");
        constants.put(LENGTH_SHORT,Toast.LENGTH_SHORT);
        constants.put(LENGTH_LONG,Toast.LENGTH_LONG);
        return  constants;
    }

        // ham custom native module
    @ReactMethod
    public void showText(String message,int duration){
        Toast.makeText(getReactApplicationContext(), message, duration).show();
//        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_LONG).show(); de day hang so toast.lengthlong qua react
    }
    @ReactMethod
    public void gotoNetwork(){
        Intent i = new Intent(Settings.ACTION_WIRELESS_SETTINGS);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        getReactApplicationContext().startActivity(i);
    }
}
