package com.example.ehulock;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.example.ehulock.model.Erreserba;

import java.util.ArrayList;

public class ErreserbaAdapter extends ArrayAdapter<Erreserba> {

    public ErreserbaAdapter(Context context, ArrayList<Erreserba> erreserbak) {
        super(context, 0, erreserbak);

    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        Erreserba erreserba = getItem(position);
        if (convertView == null) {

            convertView = LayoutInflater.from(getContext()).inflate(R.layout.item_erreserba, parent, false);

        }

        TextView tvErreserbaId = (TextView) convertView.findViewById(R.id.tvErreserbaId);
        TextView tvErabiltzaileId = (TextView) convertView.findViewById(R.id.tvErabiltzileId);
        TextView tvHasiera = (TextView) convertView.findViewById(R.id.tvHasiera);
        TextView tvamaiera = (TextView) convertView.findViewById(R.id.tvAmaiera);

        assert erreserba != null;
        tvErreserbaId.setText(String.valueOf(erreserba.getIdErreserba()));
        tvamaiera.setText(erreserba.getStart_time().toString());
        tvHasiera.setText(erreserba.getEnd_time().toString());
        tvErabiltzaileId.setText(String.valueOf(erreserba.getIdUser()));

        return convertView;

    }

}
