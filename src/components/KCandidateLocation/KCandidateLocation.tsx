import React, { FC, useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Location from 'services/location.service';
import { useField } from 'formik';
import KSelectAutocomplete from 'components/KSelectAutocomplete';
import { ICity, ICountry, IState } from 'services/typings';

const KCandidateLocation: FC<any> = ({ required }) => {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [states, setStates] = useState<IState[]>([]);
  const [cities, setCities] = useState<ICity[]>([]);

  const [country, , countryHelpers] = useField('country');
  const [state, , stateHelpers] = useField('state');
  const [, , cityHelpers] = useField('city');

  useEffect(() => {
    (async function () {
      try {
        const countries = await Location.getCountries();
        setCountries(countries);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(country.value).length > 0) {
      (async function () {
        try {
          const states = await Location.getStates(
            (country.value as any).id,
          );
          setStates(states);
        } catch (error) {}
      })();
    }
    // eslint-disable-next-line
  }, [country.value]);

  useEffect(() => {
    if (Object.keys(state.value).length > 0) {
      (async function () {
        try {
          const cities = await Location.getCities(
            (state.value as any).id,
          );
          setCities(cities);
        } catch (error) {}
      })();
    }
    // eslint-disable-next-line
  }, [state.value, country.value]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <KSelectAutocomplete
          label="Country"
          name="country"
          required={required}
          options={countries}
          noOptionsText="Loading ..."
          onChangeOpt={(_: any, value: any) => {
            countryHelpers.setValue(value);
            stateHelpers.setValue('');
            cityHelpers.setValue('');
            setStates([]);
            setCities([]);
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <KSelectAutocomplete
          label="State"
          name="state"
          required={Boolean(country.value)}
          options={states}
          noOptionsText="Loading ..."
          disabled={!Boolean(country.value)}
          onChangeOpt={(_: any, value: any) => {
            stateHelpers.setValue(value);
            cityHelpers.setValue('');
            setCities([]);
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <KSelectAutocomplete
          label="City"
          name="city"
          required={Boolean(state.value)}
          options={cities}
          noOptionsText="Loading ..."
          disabled={!Boolean(state.value)}
        />
      </Grid>
    </Grid>
  );
};

export default KCandidateLocation;
