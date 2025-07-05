/** @format */

import { Select, Form, Spin } from 'antd';
import { useState } from 'react';
import { useGetGames } from '../../entities/uploads/model/api';

const { Option } = Select;

export const GameSelect = () => {
    const [options, setOptions] = useState([]);
    const [filters, setFilters] = useState({});

    const { data, isFetching, isLoading } = useGetGames(filters);

    return (
        <Form.Item
            name="game_id"
            label="Игра"
            rules={[
                {
                    required: true,
                    message: 'Выберите к какой игре относится видео',
                },
            ]}
        >
            <Select
                showSearch
                placeholder="Выберите игру"
                filterOption={false}
                onSearch={(searchText) => {
                    setFilters({ title: searchText, all: true });
                }}
                onClear={() => setFilters({ title: '', all: false })}
                allowClear
                loading={isFetching}
                notFoundContent={isLoading ? <Spin size="small" /> : null}
            >
                {data?.list.map((game) => (
                    <Option key={game.id} value={game.id}>
                        {game.title}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    );
};
