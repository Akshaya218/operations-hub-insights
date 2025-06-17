import * as React from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Stack, Text, DefaultButton, ProgressIndicator } from '@fluentui/react';

// Define props for Dashboard
interface DashboardProps {
  themeVariant?: IReadonlyTheme;
}

const Dashboard: React.FC<DashboardProps> = ({ themeVariant }) => {
  const upcomingMeetings = [
    { title: "Weekly Team Sync", date: "Today, 2:00 PM", organizer: "John Smith" },
    { title: "Project Review", date: "Tomorrow, 10:00 AM", organizer: "Sarah Johnson" },
    { title: "Quarterly Planning", date: "Dec 20, 9:00 AM", organizer: "Mike Davis" },
  ];

  const ongoingExperiments = [
    { title: "Material Strength Test", owner: "Dr. Wilson", status: "In Progress", completion: 75 },
    { title: "Chemical Analysis", owner: "Lisa Chen", status: "Data Collection", completion: 45 },
    { title: "Quality Control Study", owner: "Mark Taylor", status: "Analysis", completion: 90 },
  ];

  const stats = [
    { label: "Active Meetings", value: "12", icon: Calendar, color: themeVariant?.palette?.themePrimary || "blue" },
    { label: "Pending Actions", value: "8", icon: Clock, color: themeVariant?.palette?.orange || "orange" },
    { label: "Completed Tasks", value: "24", icon: CheckCircle, color: themeVariant?.palette?.green || "green" },
    { label: "Ongoing Experiments", value: "6", icon: AlertCircle, color: themeVariant?.palette?.purple || "purple" },
  ];

  return (
    <Stack tokens={{ childrenGap: 24 }}>
      <Stack tokens={{ childrenGap: 4 }}>
        <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>Dashboard</Text>
        <Text variant="medium" styles={{ root: { color: themeVariant?.palette?.neutralSecondary } }}>
          Overview of your operations and activities
        </Text>
      </Stack>

      {/* Stats Grid */}
      <Stack horizontal wrap tokens={{ childrenGap: 16 }} styles={{ root: { marginBottom: 24 } }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Stack
              key={index}
              tokens={{ childrenGap: 8 }}
              styles={{
                root: {
                  minWidth: 250,
                  flexGrow: 1,
                  padding: 16,
                  background: themeVariant?.palette?.white,
                  border: `1px solid ${themeVariant?.palette?.neutralLighter}`,
                  borderRadius: 4,
                  boxShadow: themeVariant?.effects?.elevation8,
                }
              }}
            >
              <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
                <Stack
                  styles={{
                    root: {
                      padding: 8,
                      borderRadius: 8,
                      background: themeVariant?.palette?.neutralLighterAlt,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }
                  }}
                >
                  <Icon size={24} style={{ color: stat.color }} />
                </Stack>
                <Stack>
                  <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>{stat.value}</Text>
                  <Text variant="small" styles={{ root: { color: themeVariant?.palette?.neutralSecondary } }}>{stat.label}</Text>
                </Stack>
              </Stack>
            </Stack>
          );
        })}
      </Stack>

      <Stack tokens={{ childrenGap: 24 }}>
        {/* Upcoming Meetings */}
        <Stack
          tokens={{ childrenGap: 16 }}
          styles={{
            root: {
              padding: 16,
              background: themeVariant?.palette?.white,
              border: `1px solid ${themeVariant?.palette?.neutralLighter}`,
              borderRadius: 4,
              boxShadow: themeVariant?.effects?.elevation8,
            }
          }}
        >
          <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
            <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>Upcoming Meetings</Text>
            <Calendar size={20} style={{ color: themeVariant?.palette?.themePrimary }} />
          </Stack>
          <Stack tokens={{ childrenGap: 12 }}>
            {upcomingMeetings.map((meeting, index) => (
              <Stack
                key={index}
                horizontal
                verticalAlign="center"
                tokens={{ childrenGap: 12 }}
                styles={{
                  root: {
                    padding: 12,
                    background: themeVariant?.palette?.neutralLighterAlt,
                    borderRadius: 4
                  }
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: themeVariant?.palette?.themePrimary,
                    borderRadius: '50%',
                    marginRight: 12,
                    display: 'inline-block'
                  }}
                />
                <Stack>
                  <Text styles={{ root: { fontWeight: 500, color: themeVariant?.palette?.neutralPrimary } }}>{meeting.title}</Text>
                  <Text variant="small" styles={{ root: { color: themeVariant?.palette?.neutralSecondary } }}>
                    {meeting.date} • {meeting.organizer}
                  </Text>
                </Stack>
              </Stack>
            ))}
          </Stack>
          <DefaultButton text="View All Meetings →" styles={{ root: { width: '100%', marginTop: 16, fontWeight: 600 } }} />
        </Stack>

        {/* Ongoing Experiments */}
        <Stack
          tokens={{ childrenGap: 16 }}
          styles={{
            root: {
              padding: 16,
              background: themeVariant?.palette?.white,
              border: `1px solid ${themeVariant?.palette?.neutralLighter}`,
              borderRadius: 4,
              boxShadow: themeVariant?.effects?.elevation8,
            }
          }}
        >
          <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
            <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>Ongoing Experiments</Text>
            <AlertCircle size={20} style={{ color: themeVariant?.palette?.themePrimary }} />
          </Stack>
          <Stack tokens={{ childrenGap: 16 }}>
            {ongoingExperiments.map((experiment, index) => (
              <Stack
                key={index}
                tokens={{ childrenGap: 8 }}
                styles={{
                  root: {
                    padding: 12,
                    background: themeVariant?.palette?.neutralLighterAlt,
                    borderRadius: 4
                  }
                }}
              >
                <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
                  <Text styles={{ root: { fontWeight: 500, color: themeVariant?.palette?.neutralPrimary } }}>{experiment.title}</Text>
                  <Text
                    variant="tiny"
                    styles={{
                      root: {
                        background: themeVariant?.palette?.themeLighter,
                        color: themeVariant?.palette?.themePrimary,
                        padding: '2px 6px',
                        borderRadius: 2
                      }
                    }}
                  >
                    {experiment.status}
                  </Text>
                </Stack>
                <Text variant="small" styles={{ root: { color: themeVariant?.palette?.neutralSecondary } }}>
                  Owner: {experiment.owner}
                </Text>
                <ProgressIndicator
                  percentComplete={experiment.completion / 100}
                  barHeight={8}
                  styles={{
                    itemProgress: {
                      background: themeVariant?.palette?.themePrimary,
                      borderRadius: 9999,
                      transition: 'width 0.3s ease-in-out'
                    },
                    progressTrack: {
                      background: themeVariant?.palette?.neutralLight,
                      borderRadius: 9999
                    }
                  }}
                />
                <Text variant="tiny" styles={{ root: { color: themeVariant?.palette?.neutralSecondary, marginTop: 4 } }}>
                  {experiment.completion}% Complete
                </Text>
              </Stack>
            ))}
          </Stack>
          <DefaultButton text="View All Experiments →" styles={{ root: { width: '100%', marginTop: 16, fontWeight: 600 } }} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
