import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchChannelById = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};
export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(["user", email], () =>
    fetchUserByEmail(email)
  );
  const channelId = user?.data.channelId;

  const { data: channel } = useQuery(
    ["channel", channelId],
    () => fetchChannelById(channelId),
    {
      enabled: !!channelId,
    }
  );

  console.log({user,channel});
  return <div>DependentQueriesPage</div>;
};
